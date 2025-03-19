import {
  addConstructorItem,
  constructorItemsReducer,
  moveUpConstructorItem,
  removeConstructorItem,
  constructorInitialState
} from '@slices';

import { expect, describe, test } from '@jest/globals';

describe('Тест редьюсера constructorItemSlice', () => {
  const testConstructorItems = {
    bun: {
      _id: '643d69a5c3f7b9001cfa093d',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
      __v: 0,
      id: 'a6950e9a-0780-4f11-af0c-dd87f01c6987'
    },
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0,
        id: '06749e33-2558-4274-acfe-7a25cc83d5ec'
      },
      {
        _id: '643d69a5c3f7b9001cfa0949',
        name: 'Мини-салат Экзо-Плантаго',
        type: 'main',
        proteins: 1,
        fat: 2,
        carbohydrates: 3,
        calories: 6,
        price: 4400,
        image: 'https://code.s3.yandex.net/react/code/salad.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
        __v: 0,
        id: '7bb185d7-72e3-421a-aa44-791e5801dd3f'
      },
      {
        _id: '643d69a5c3f7b9001cfa0943',
        name: 'Соус фирменный Space Sauce',
        type: 'sauce',
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
        __v: 0,
        id: '9177249c-bacc-4a89-b4dd-31c7f7e02272'
      }
    ]
  };

  const newIngredient = {
    _id: '643d69a5c3f7b9001cfa0946',
    name: 'Хрустящие минеральные кольца',
    type: 'main',
    proteins: 808,
    fat: 689,
    carbohydrates: 609,
    calories: 986,
    price: 300,
    image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
    image_mobile:
      'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
    image_large:
      'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
    __v: 0,
    id: 'ac403fd4-e1f4-4021-a43b-0791e5a100f7'
  };

  const testInitialState = {
    ...constructorInitialState,
    constructorItems: testConstructorItems
  };

  test('добавить ингредиент', () => {
    const newState = constructorItemsReducer(
      testInitialState,
      addConstructorItem(newIngredient)
    );

    expect(newState.constructorItems.ingredients).toHaveLength(
      testConstructorItems.ingredients.length + 1
    );

    expect(newState.constructorItems.ingredients.at(-1)?._id).toBe(
      '643d69a5c3f7b9001cfa0946'
    );
  });

  test('удалить ингредиент', () => {
    const newState = constructorItemsReducer(
      testInitialState,
      removeConstructorItem(2)
    );
    expect(newState.constructorItems.ingredients).toEqual(
      testConstructorItems.ingredients.slice(0, 2)
    );
  });

  describe('изменить порядок ингредиентов', () => {
    test('переместить ингредиент вверх', () => {
      const movedItem = testConstructorItems.ingredients.slice(-1)[0];
      const newState = constructorItemsReducer(
        testInitialState,
        moveUpConstructorItem(movedItem)
      );
      const expectedState = [...testConstructorItems.ingredients];
      expectedState.splice(-1);
      expectedState.splice(1, 0, movedItem);
      expect(newState.constructorItems.ingredients).toEqual(expectedState);
    });

    test('переместить ингредиент вниз', () => {
      const movedItem = testConstructorItems.ingredients.slice(-3)[0];
      const newState = constructorItemsReducer(
        testInitialState,
        moveUpConstructorItem(movedItem)
      );
      const expectedState = [...testConstructorItems.ingredients];
      expectedState.splice(-3, 1);
      expectedState.splice(1, 0, movedItem);
      expect(newState.constructorItems.ingredients).toEqual(expectedState);
    });
  });
});

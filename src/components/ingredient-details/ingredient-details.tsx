import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '@store';
import { addConstructorItem, getIngredientsSelector } from '@slices';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ingredientData = useSelector(getIngredientsSelector).find(
    (item) => item._id === id
  );
  const handleAdd = () => {
    dispatch(addConstructorItem(ingredientData!));
    navigate(-1);
  };

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};

import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('se fumeaza stou', userIngredients);
  }, [userIngredients]);

  const addIngredientHandler = (ingredient) => {
    setIsLoading(true);
    fetch('https://react-hooks-testing-43a82.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setIsLoading(false);
        return response.json();
      })
      .then((responseData) => {
        setUserIngredients((prevIngredients) => [
          ...prevIngredients,
          { id: responseData.name, ...ingredient },
        ]);
      });
  };

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    setUserIngredients(filteredIngredients);
  }, []);

  const removeIngredientHandler = (ingId) => {
    setIsLoading(true);
    fetch(
      `https://react-hooks-testing-43a82.firebaseio.com/ingredients/${ingId}.json`,
      {
        method: 'DELETE',
      }
    ).then((response) => {
      setIsLoading(false);
      setUserIngredients((prevIngredients) =>
        prevIngredients.filter((ingredient) => ingredient.id !== ingId)
      );
    });
  };

  return (
    <div className='App'>
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeIngredientHandler}
      />
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {/* Need to add list here! */}
      </section>
    </div>
  );
};

export default Ingredients;

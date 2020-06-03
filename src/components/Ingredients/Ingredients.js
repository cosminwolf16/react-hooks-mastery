import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    console.log('se fumeaza stou', userIngredients);
  }, [userIngredients]);

  const addIngredientHandler = (ingredient) => {
    fetch('https://react-hooks-testing-43a82.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
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
    fetch(
      `https://react-hooks-testing-43a82.firebaseio.com/ingredients/${ingId}.json`,
      {
        method: 'DELETE',
      }
    ).then((response) => {
      setUserIngredients((prevIngredients) =>
        prevIngredients.filter((ingredient) => ingredient.id !== ingId)
      );
    });
  };

  return (
    <div className='App'>
      <IngredientForm onAddIngredient={addIngredientHandler} />
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

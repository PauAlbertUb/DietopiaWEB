import { defineStore } from 'pinia'
import { ref } from 'vue'
import { MOCK_MEAL_PLAN } from '../services/mockData'

export const useDietStore = defineStore('diet', () => {
  const mealPlan = ref(MOCK_MEAL_PLAN)
  const selectedDay = ref(0)

  const getCurrentDayMeals = () => {
    return mealPlan.value.days[selectedDay.value]?.meals || {}
  }

  const getCurrentDay = () => {
    return mealPlan.value.days[selectedDay.value]
  }

  const selectDay = (dayIndex) => {
    selectedDay.value = dayIndex
  }

  const getTotalCalories = () => {
    const meals = getCurrentDayMeals()
    return Object.values(meals).reduce((total, meal) => total + (meal.calories || 0), 0)
  }

  return {
    mealPlan,
    selectedDay,
    getCurrentDayMeals,
    getCurrentDay,
    selectDay,
    getTotalCalories
  }
})

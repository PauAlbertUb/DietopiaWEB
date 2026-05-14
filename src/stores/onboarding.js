import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOnboardingStore = defineStore('onboarding', () => {
  const currentStep = ref(1)
  const totalSteps = 6
  const formData = ref({
    // Parte 1 - Datos esenciales
    weight: '',
    height: '',
    age: '',
    goal: 'lose_weight',
    restrictions: [],
    budget: '',
    planningType: 'weekly',
    
    // Parte 2 - Datos refinados
    cookingTime: '',
    shoppingTime: '',
    physicalActivity: '',
    activityType: '',
    activityFrequency: '',
    preferences: [],
    peopleCount: 1
  })

  const isFirstPartComplete = () => {
    return (
      formData.value.weight &&
      formData.value.height &&
      formData.value.age &&
      formData.value.goal &&
      formData.value.budget &&
      formData.value.planningType
    )
  }

  const isOnboardingComplete = () => {
    return currentStep.value > totalSteps
  }

  const nextStep = () => {
    if (currentStep.value < totalSteps) {
      currentStep.value++
    }
  }

  const previousStep = () => {
    if (currentStep.value > 1) {
      currentStep.value--
    }
  }

  const skipToEnd = () => {
    currentStep.value = totalSteps + 1
  }

  const resetOnboarding = () => {
    currentStep.value = 1
    formData.value = {
      weight: '',
      height: '',
      age: '',
      goal: 'lose_weight',
      restrictions: [],
      budget: '',
      planningType: 'weekly',
      cookingTime: '',
      shoppingTime: '',
      physicalActivity: '',
      activityType: '',
      activityFrequency: '',
      preferences: [],
      peopleCount: 1
    }
  }

  const getProgressPercentage = () => {
    return Math.round((currentStep.value / totalSteps) * 100)
  }

  return {
    currentStep,
    totalSteps,
    formData,
    isFirstPartComplete,
    isOnboardingComplete,
    nextStep,
    previousStep,
    skipToEnd,
    resetOnboarding,
    getProgressPercentage
  }
})

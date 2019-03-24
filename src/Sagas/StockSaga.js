import NavigationService from '../Navigation/NavigationService'

export function* selectListSaga(action) {
  try {
    NavigationService.navigate('DetailShoppingListScreen')
  } catch (error) {
    console.log('error', error)
  }
}

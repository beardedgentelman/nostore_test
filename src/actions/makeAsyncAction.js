import { toast } from 'react-toastify'

import { ASYNC_ACTION_FAILURE, ASYNC_ACTION_STARTED } from './types'

export const makeAsyncAction = (
  dispatch,
  { api = null, apiArguments = [], successActions = [], successArguments = [], successMessage = '' }
) => {
  dispatch(asyncActionStarted())
  api(...apiArguments)
    .then(res => {
      successActions.forEach(action => {
        dispatch(action(res, ...successArguments))
      })
      if (successMessage) toast.success(successMessage)
    })
    .catch(err => {
      dispatch(asyncActionFailure(err))
    })
}

const asyncActionStarted = () => ({
  type: ASYNC_ACTION_STARTED
})

const asyncActionFailure = error => ({
  type: ASYNC_ACTION_FAILURE,
  payload: {
    error
  }
})

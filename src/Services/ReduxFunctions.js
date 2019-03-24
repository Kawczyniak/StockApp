const createAsyncType = action => ({
  ATTEMPT: `${action}.ATTEMPT`,
  SUCCESS: `${action}.SUCCESS`,
  FAILURE: `${action}.FAILURE`,
})

const createAsyncAction = type => ({
  Attempt: ({ ...props }) => ({
    type: type.ATTEMPT,
    ...props,
  }),
  Success: ({ ...payload }) => ({
    type: type.SUCCESS,
    ...payload,
  }),
  Failure: ({ ...props }) => ({
    type: type.FAILURE,
    ...props,
  }),
})

const createSyncAction = type => ({ ...props }) => ({
  type: type,
  ...props,
})

export { createAsyncType, createAsyncAction, createSyncAction }

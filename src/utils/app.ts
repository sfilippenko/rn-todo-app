export const createAction = <Payload>(type: string) => {
  const func = (payload: Payload) => {
    return {
      type,
      payload,
    };
  };

  func.toString = () => type;

  return func;
};

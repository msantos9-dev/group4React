import { GLOBALTYPES } from './globalTypes'


export const handleTheme = (e) => async (dispatch) => {
    // getting the true or false value from the parameter and saving that to localstorage
    localStorage.setItem("mode", e);
  
    //dispatch data to reducer to be accessed as payload.action
    dispatch({
      type: GLOBALTYPES.THEME,
      payload: e,
    });
  };
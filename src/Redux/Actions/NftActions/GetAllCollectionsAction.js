import { createAction, createActions } from "redux-actions";
import Api from "../../Api";

export const GetAllCollectionsRequest = createAction("GetAllCollections_REQUEST");
export const GetAllCollectionsSuccess = createAction("GetAllCollections_SUCCESS");
export const GetAllCollectionsFail = createAction("GetAllCollections_FAIL");

const GetAllCollections = (body) => (dispatch) => {
  // dispatch(GetFavouriteNftRequest());
  return new Promise((resolve) => {
    return Api.GetAllCollections.GetAllCollcectionsApi(body)
      .then(({ data }) => {
        dispatch(GetAllCollectionsSuccess(data));
        resolve(data);
      })
      .catch((error) => {
        dispatch(GetAllCollectionsFail(error));
        resolve();
      });
  });
};
export default GetAllCollections;

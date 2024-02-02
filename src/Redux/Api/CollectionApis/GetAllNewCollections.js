import http from "../http";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

export default class GetAllTodayCollections {
  static GetAllTodayCollectionsApi(body) {
    return http.get(
      httpUrl + "/api/v1/Nft/GetAllTodayCollections"
    );
  }
}

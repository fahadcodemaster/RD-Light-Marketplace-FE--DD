import http from "../http";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

export default class GetNftActivityByHistory {
  static GetNftActivityByHistoryApi(body) {
    return http.get(httpUrl + "/api/v1/Nft/GetNftActivityHistory?nftId=" + body);
  }
}

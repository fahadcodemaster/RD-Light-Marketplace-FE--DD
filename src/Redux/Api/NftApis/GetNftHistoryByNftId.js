import http from "../http";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

export default class GetNftHistoryByNftId {
  static GetNftHistoryByNftIdApi(body) {
    return http.get(httpUrl + "/api/v1/Nft/NftHistoryActivityByAccountAndNft?NftId=" + body);
  }
}

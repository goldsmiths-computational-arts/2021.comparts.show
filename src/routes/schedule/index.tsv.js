import { tsvFormat } from "d3-dsv";
import { schedule } from "../../js/schedule";

export function get(req, res, next) {
  res.writeHead(200, {
    "Content-Type": "text/plain",
  });

  res.end(tsvFormat(schedule));
}

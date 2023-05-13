import { useEffect } from "react";
import UserProductList from "./UserProductList.jsx";
import bufferToUrl from "../../utils/BufferToUrl.js";

export default function UserProducts({
  rendered,
  setRendered,
  userProducts,
  setSelectedId,
}) {
  useEffect(() => {
    userProducts.forEach((product) => {
      product.picture = bufferToUrl(product.picture.data);
    });
  }, [userProducts]);

  return (
    <div className="">
      <div className="userProducts">
        <h5>Your Models</h5>
        <button className="userProducts__button-add" onClick={() => setRendered("ProductAdd")}>Add new model</button>

            <UserProductList
              rendered={rendered}
              setRendered={setRendered}
              setSelectedId={setSelectedId}
              userProducts={userProducts}
            />
      </div>
    </div>
  );
}

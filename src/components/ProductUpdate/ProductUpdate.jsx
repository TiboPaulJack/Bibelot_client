import { useContext, useState } from "react";
import { UserContext } from "../../App.jsx";
import "./productUpdate.css";
import baseHost from "../../assets/baseHost.js";

export default function ProductUpdate({ rendered, id, setRefresh }) {
  
  // todo : FETCH TAGS TO DISPLAY CURRENT TAGS IN THE INPUT
  
  const logout = useContext(UserContext).logout;
  const [tags, setTags] = useState([]);

  const updateProduct = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const filteredData = {};
    for (let [key, value] of formData.entries()) {
      if (value !== "") {
        filteredData[key] = value;
      }
    }

    
    fetch(baseHost + `/model/${id}`, {
      method: "PATCH",
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("token")} `,
      },
      body: JSON.stringify(filteredData),
    }).then((res) => {
      if (res.status === 200) {
        setRefresh(true);
        return res.json();
      } else if (res.status === 401) {
        logout();
        window.location = "/";
      } else if (res.status !== 200) {
        console.error(`Error: ${res.message} `, res.status);
      }
    });
    rendered("UserProducts");
  };
  
  
  const handleTags = (e) => {
    const tagInput = document.getElementById("tag");
    setTags([...tags, tagInput.value]);
    tagInput.value = "";
    
  }
  
  
  return (
    <div className="productUpdate">
      <div className="userpage__title">ProductUpdate</div>
      <button
        className="productAdd__close"
        onClick={() => rendered("UserProducts")}
      >
        X
      </button>
      <form className="productAdd__form" onSubmit={updateProduct}>
        <label>Product Name</label>
        <input type="text"
               name="name" />
        <label>Product Description</label>
        <input
          type="text"
          name="description"
        />
        <label>Is available to download ?</label>
        <select name="download">
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <label>Tags</label>
        <div className="productAdd__tagsList">
        
        </div>
        <div className="box-tags">
          <input className='productAdd__tags'
                 id="tag"
                 type="text"
                 name="tag"
          
          />
          <button className="addTag-button"
                  type="button"
                  onClick={handleTags}
          >
            Add
          </button>
        </div>
        <div className="productAdd__tag-list">
          {
            tags.map((tag, index) => (
              <span className="tag-item" key={index}>{tag}</span>
            ))
          }
        </div>
        <button className="productUpdate__button" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}

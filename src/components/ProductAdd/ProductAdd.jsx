import './productAdd.css'
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App.jsx";
import { createPortal } from "react-dom";
import Modal from "../Modal/Modal.jsx";
import s3PutObject from "../../utils/S3PutObject.js";


export default function ProductAdd (props)  {
  
  // TODO : Refactor => Create new component for the form
  
  const baseApi = import.meta.env.VITE_BASE_API
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const { logout, setModalContent, setShowModal, showModal } = useContext(UserContext);
  const { setRefresh } = props;
  const { rendered } = props;
  const { isLoading ,setIsLoading } = props;

  
  useEffect(() => {
    fetch(baseApi + '/category', {
      method: "GET",
    }).then((res) => res.json()
    ).then((data) => setCategories(data))
  }, []);
  
  
  const AddProduct = (formData) => {
    fetch(`${baseApi}/model/add`, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem("token")} `,
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    }).then((res) => {
      setRefresh(true);
      setIsLoading(false);
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 401) {
        logout()
        window.location = "/";
      }})
    rendered("UserProducts")
  }
  
  const saveFilesToS3 = async (formData) => {
    const data = formData.get("data");
    const format = data.name.split('.').pop();
    const size = data.size;
    formData.set("size", size);
    formData.set("format", format);
    const picture = formData.get("picture");
    const dataKey = await s3PutObject(data);
    const pictureKey = await s3PutObject(picture);
    await formData.set("data", dataKey);
    await formData.set("picture", pictureKey);
    AddProduct(formData);
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.delete("tag");
    const formattedTags = `{${tags.join(',')}}`;
    formData.append("tag", formattedTags);
    if(tags.length === 0){
      setModalContent("Please add at least one tag");
      setShowModal(true);
    }else{
      setIsLoading(true)
      await saveFilesToS3(formData)
    }
  }
  
  const handleTags = () => {
    const tagInput = document.getElementById("tag");
    setTags([...tags, tagInput.value]);
    tagInput.value = "";
  }
  
    return (
      
        <div className={ "productAdd" }>
          { showModal && createPortal(
            <Modal/>,
            document.body
          ) }
          <button className="productAdd__close"
                    onClick={ () => rendered( "UserProducts" ) }>
            X
          </button>
          <form className="productAdd__form" onSubmit={ handleSubmit }>
            <label>Product Name</label>
            <input type="text"
                   name="name"
                   required
            />
            <label>Category</label>
            <select name="category_id" id="category" required>
              <option value="all">All</option>
              {
                categories.map( ( category ) => (
                  <option key={ category.id } value={ category.id }>{ category.name }</option>
                ) )
              }
            </select>
            <label>Product Description </label>
            <input type="text"
                   name="description"
                   required
            />
            <label>Is available to download ?</label>
            <select name="download" required>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <label>Preview Image</label>
            <input type="file"
                   name="picture"
                   required
            />
            <label>Glb File</label>
            <input type="file"
                   accept={ ".glb" }
                   name="data"
                   required
            />
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
                      onClick={ handleTags }
              >
                Add
              </button>
            </div>
            <div className="productAdd__tag-list">
              {
                tags.map( ( tag, index ) => (
                  <span className="tag-item" key={ index }>{ tag }</span>
                ) )
              }
            </div>
            <button className="productAdd__button" type="submit">Add</button>
          </form>
        </div>

    );
}


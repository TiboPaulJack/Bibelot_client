




export default function Form ({ handleSubmit, categories, handleTags, tags}) {




    return (
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
                   accept={ ".jpg, .jpeg, .png" }
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
    );


}

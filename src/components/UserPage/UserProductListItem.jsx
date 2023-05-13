


export default function UserProductListItem (props) {
  
  
  const { rendered, name, id, setSelectedId, isLoading } = props;
  
  const handleEdit = () => {
    rendered("ProductUpdate")
    setSelectedId(id)
  }
  
  const handleDelete = (id) => {
    rendered("ProductDelete")
    setSelectedId(id)
  }
  
  return (
    <div
      className={
        isLoading ? "userProducts__item isLoading" : "userProducts__item"
      }
    >
      <span
        className={
          isLoading
            ? "userProducts__item__name isLoading"
            : "userProducts__item__name"
        }
      >
        {name}
      </span>
      <span
        className={
          isLoading
            ? "userProducts__item__likes isLoading"
            : "userProducts__item__likes"
        }
      >
      
      </span>
      <div className="userProducts__Buttons">
        <span
          className={
            isLoading
              ? "userProducts__item__edit isLoading"
              : "userProducts__item__edit"
          }
          onClick={handleEdit}
        >
          Edit
        </span>
        <span
          className={isLoading ? "userProducts__item__delete isLoading"  : "userProducts__item__delete"}
          onClick={() => handleDelete(id)}
        >
          Delete
        </span>
      </div>
    </div>
  );
  
}

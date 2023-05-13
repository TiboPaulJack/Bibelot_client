


export default function Comment(props) {

  const {content, created_at, pseudo} = props.comment;

  return (
    <div className="comment">
      <div className="comment__infos">
        <div className="comment__author">{pseudo}</div>
        <div className="comment__date">{created_at}</div>
      </div>
      <div className="comment__content">{ content }</div>
    </div>
  );
}


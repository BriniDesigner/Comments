// Comment Box
var CommentBox = React.createClass({
  getInitialState: function(){
    return {data: []};
  },
  loadComments: function(){
    this.setState({data: this.props.data});
  },
  componentDidMount: function(){
    this.loadComments();
    setInterval(this.loadComments, 3000);
  },
  handleCommentSubmit: function(comment){
    var comments = this.state.data;
    // Every element needs a key value
    comment.id = Date.now();
    comments.push(comment);
    this.setState({data:comments});
  },
  render:function(){
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data}/>
        <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
      </div>
    );
  }
});

// Comment List
var CommentList = React.createClass({
  each: function(comment){
    return (
      <Comment key={comment.id} author={comment.author} >{comment.text}</Comment>
    );
  },
  render: function(){
    return(
      <div className="commentList">
        {this.props.data.map(this.each)}
      </div>
    );
  }
});

// Comment
var Comment = React.createClass({
  render: function(){
    return(
    <div className="comment">
      <h3 className="author">{this.props.author}</h3>
      <p>{this.props.children}</p>
      <hr/>
    </div>
  );
  }
});

// Comment Form
var CommentForm = React.createClass({
  getInitialState: function(){
    return {author: '', text: ''};
  },
  handleTextChange: function(e){
    this.setState({text:e.target.value});
  },
  handleAuthorChange: function(e){
    this.setState({author:e.target.value});
  },
  handleSubmit: function(e){
    e.preventDefault();
    var author = this.state.author;
    var text = this.state.text;
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author:'', text:''});
  },
  render: function(){
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
       <input type="text" placeholder="your name" value={this.state.author} onChange={this.handleAuthorChange} />
       <input type="text" placeholder="Say something..." value={this.state.text} onChange={this.handleTextChange} />
       <input type="submit" value="Comment" />
      </form>
    );
  }
});

var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is another comment"}
];

ReactDOM.render(
  <CommentBox data={data} />,
  document.getElementById("content")
);

class CommentModel {
    constructor(type) {
        // The type is the type in Comments
        this.type = type;

        // This reads from the Local Storage by type, if nothing's in storage it makes an empty array
        this.comments = readFromLS(type) || [];
    }

    getComments(query = null) {
        // If the query is null it returns the comments, if not it returns a filtered list according to the query
        if(query === null) {
            return this.comments;
        } else {
            return this.comments.filter(element => element.name === query);
        }
    }

    addComment(hikeName, comment) {
        // Makes a new comment
        const newComment = {
            name: hikeName,
            date: new Date(),
            content: comment
        };

        // Pushes the new comment to the comment list and writes the new list to local storage
        this.comments.push(newComment);
        writeToLS(this.type, this.comments);
    }
}

function readFromLS(key) {
    // Gets a value from local storage and reads it as a JSON
    const value = localStorage.getItem(key);
    return JSON.parse(value);
}

function writeToLS(key, data) {
    // Writes the JSON as a string so the local storage has the string instead of an object
    localStorage.setItem(key, JSON.stringify(data));
}

// The comment list's HTML
const commentUI = `<div class="addComment">
<h2>Add a comment</h2>
<input type="text" id="commentEntry" />
<button id="commentSubmit">Comment</button>
</div>
<h2>Comments</h2>
<ul class="comments"></ul>`;

function renderCommentList(element, list) {
    // Clears the element's innerHTML for replacement
    element.innerHTML = "";

    // Adds new HTML for each comment
    list.forEach(comment => {
        // Makes a new list item
        const listItem = document.createElement("li");
        // Turns the list item's HTML into the comment's name and content
        listItem.innerHTML = `${comment.name}: ${comment.content}`;
        // Appends the list item to the element
        element.appendChild(listItem);
    });
}

export default class Comments {
    constructor(type, commentElementId) {
        // The type and commentElementId are set when you make a new class instance
        this.type = type;

        // The commentElementId set in hikes is the div with #comments
        this.commentElementId = commentElementId;

        // This is the CommentModel class that's up there
        this.model = new CommentModel(this.type);
    }

    addSubmitListener(postName) {
        // Gets the button with #commentSubmit and puts a function for touchend on it
        document.getElementById("commentSubmit").ontouchend = () => {
            // Adds a comment using the CommentModel, the name of the hike, and the comment input's value
            this.model.addComment(postName, document.getElementById("commentEntry").value);

            // Clears the comment input
            document.getElementById("commentEntry").value = "";

            // Resets the comment list
            this.showCommentList(postName);
        }
    }

    showCommentList(query = null) {
        // Tries the following code, shows error on the console if it doesn't work
        try {
            // The parent is the class's commentElementId
            const parent = document.getElementById(this.commentElementId);

            // If no parent, throw an error
            if(!parent) {throw new Error("Comment parent not found.")};

            // If the parent's HTML is empty, change it to the comment UI made further up
            if(parent.innerHTML === "") {parent.innerHTML = commentUI};

            // If the query isn't null, the div with .addComment shows up, otherwise it's not there
            if(query !== null) {
                document.querySelector(".addComment").style.display = "block";
                this.addSubmitListener(query);
            } else {
                document.querySelector(".addComment").style.display = "none";
            }

            // commentsList is the getComments method from the CommentModel using the query
            let commentsList = this.model.getComments(query);

            // If commentsList doesn't have a value then make it an empty array
            if(commentsList === null) {
                commentsList = [];
            }

            // Renders the comment list with the parent's child as the element and the commentsList as the list
            renderCommentList(parent.lastChild, commentsList);
        } catch(error) {
            console.log(error);
        }
    }
}
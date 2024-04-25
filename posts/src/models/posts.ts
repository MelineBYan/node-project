import mongoose from "mongoose";

interface PostsAttrs {
    title: string;
    content: string;
    userId: string;
}

interface PostDoc extends mongoose.Document {
    title: string;
    content: string;
    userId: string;
}

interface PostModel extends mongoose.Model<PostDoc> {
    build(attrs: PostsAttrs): PostDoc;
}

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});



postSchema.statics.build = (attrs: PostsAttrs) => {
    return new Post(attrs);
};

const Post = mongoose.model<PostDoc, PostModel>("Post", postSchema);

export { Post };
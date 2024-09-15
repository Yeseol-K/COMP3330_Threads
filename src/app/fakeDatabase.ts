export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string;
  followers: number;
};

export type Media = {
  id: number;
  type: "image" | "video";
  url: string;
  width: number;
  height: number;
};

export type Post = {
  id: number;
  user: User;
  date: string;
  content: string;
  likes: number;
  replies: number;
  replyId?: number;
  media?: Media;
};

const users: User[] = [
  {
    id: 1,
    username: "sam",
    avatar: "https://images.clerk.dev/uploaded/img_2UwOmQYFLO3AhjoORmTygZ7OM8Y.png",
    firstName: "saM",
    lastName: "saM",
    followers: 100,
  },
  {
    id: 2,
    username: "jane_doe",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    firstName: "Jane",
    lastName: "Doe",
    followers: 250,
  },
  {
    id: 3,
    username: "john_smith",
    avatar: "https://randomuser.me/api/portraits/men/64.jpg",
    firstName: "John",
    lastName: "Smith",
    followers: 180,
  },
  {
    id: 4,
    username: "alice_wonder",
    avatar: "https://randomuser.me/api/portraits/women/55.jpg",
    firstName: "Alice",
    lastName: "Wonder",
    followers: 320,
  },
];

const posts: Post[] = [
  {
    id: 1,
    user: users[0],
    date: "2024-01-01T12:00:00.000Z",
    content: "Just some content to get us started. This is a post with some content. It's not very interesting, but it's a post.",
    likes: 10,
    replies: 0,
  },
  {
    id: 2,
    user: users[0],
    date: "2024-01-01T12:00:00.000Z",
    content: "This one is slightly more interesting. It has an image.",
    likes: 10,
    replies: 0,
    media: {
      id: 1,
      type: "image",
      url: "https://picsum.photos/seed/picsum/200/300",
      width: 200,
      height: 300,
    },
  },
  {
    id: 3,
    user: users[1],
    date: "2024-02-15T14:30:00.000Z",
    content: "Excited for my upcoming vacation! 🌴☀️",
    likes: 35,
    replies: 2,
  },
  {
    id: 4,
    user: users[2],
    date: "2024-03-10T09:45:00.000Z",
    content: "Just finished reading a fantastic book. Highly recommend!",
    likes: 22,
    replies: 3,
  },
  {
    id: 5,
    user: users[3],
    date: "2024-04-01T11:15:00.000Z",
    content: "Had a great weekend hiking through the mountains. 🏞️",
    likes: 40,
    replies: 5,
    media: {
      id: 2,
      type: "image",
      url: "https://picsum.photos/seed/mountain/200/300",
      width: 200,
      height: 300,
    },
  },
  {
    id: 6,
    user: users[1],
    date: "2024-04-15T16:00:00.000Z",
    content: "Back to work after a long break. Feeling refreshed and ready to go!",
    likes: 15,
    replies: 1,
  },
];

export function getPosts(): Post[] {
  return posts.filter((post) => !post.replyId);
}

export function getPost(id: number): Post | undefined {
  return posts.find((post) => post.id === id);
}

export function getPostResponses(id: number): Post[] {
  return posts.filter((post) => post.replyId === id);
}

export function getUser(username: string): User | undefined {
  return users.find((user) => user.username === username);
}

export function getPostsForUser(username: string): Post[] {
  return posts.filter((post) => post.user.username === username);
}

import type {
  ChatMemberModel,
  ChatRoomModel,
  FileModelWithUrl,
  MessageModel,
  Post,
  PostModel,
  Save,
  SaveModel,
  UserModel
} from '../../types'

const defaultDocMeta = {
  $createdAt: '2026-01-15T12:00:00.000Z',
  $updatedAt: '2026-01-15T12:00:00.000Z',
  $permissions: ['read("any")', 'write("user:mock-user-1")'],
  $databaseId: 'mock-database',
  $collectionId: 'mock-collection'
}

const createMockFile = (id: string, url: string, name: string): FileModelWithUrl => ({
  $id: id,
  $createdAt: defaultDocMeta.$createdAt,
  $updatedAt: defaultDocMeta.$updatedAt,
  $permissions: defaultDocMeta.$permissions,
  bucketId: 'mock-bucket',
  name,
  signature: 'mock-sig',
  mimeType: 'image/jpeg',
  sizeOriginal: 1024 * 1024,
  chunksTotal: 1,
  chunksUploaded: 1,
  url
})

export const mockUsers: UserModel[] = [
  {
    ...defaultDocMeta,
    $id: 'mock-user-1',
    name: 'Alex Rivera',
    username: 'arivera',
    accountId: 'mock-account-1',
    email: 'alex.rivera@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    bio: 'Digital creator & photographer based in SF 📸',
    tags: ['photography', 'tech', 'travel'],
    posts: [],
    liked: [],
    saves: [],
    followings: [],
    followers: [],
    chats: []
  },
  {
    ...defaultDocMeta,
    $id: 'mock-user-2',
    name: 'Elena Rostova',
    username: 'erostova',
    accountId: 'mock-account-2',
    email: 'elena.rostova@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
    bio: 'Architect & 3D visualization specialist 🏛️',
    tags: ['architecture', 'design', 'art'],
    posts: [],
    liked: [],
    saves: [],
    followings: [],
    followers: [],
    chats: []
  },
  {
    ...defaultDocMeta,
    $id: 'mock-user-3',
    name: 'Marcus Chen',
    username: 'mchen',
    accountId: 'mock-account-3',
    email: 'marcus.chen@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    bio: 'Coffee lover and indie hacker ☕💻',
    tags: ['coffee', 'coding', 'minimalism'],
    posts: [],
    liked: [],
    saves: [],
    followings: [],
    followers: [],
    chats: []
  },
  {
    ...defaultDocMeta,
    $id: 'mock-user-4',
    name: 'Sophia Patel',
    username: 'spatel',
    accountId: 'mock-account-4',
    email: 'sophia.patel@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
    bio: 'Trail runner & mountain explorer 🏔️',
    tags: ['outdoor', 'hiking', 'adventure'],
    posts: [],
    liked: [],
    saves: [],
    followings: [],
    followers: [],
    chats: []
  },
  {
    ...defaultDocMeta,
    $id: 'mock-user-5',
    name: 'Liam Vance',
    username: 'lvance',
    accountId: 'mock-account-5',
    email: 'liam.vance@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    bio: 'Sound designer & synthesist 🎹🎧',
    tags: ['music', 'synth', 'sound'],
    posts: [],
    liked: [],
    saves: [],
    followings: [],
    followers: [],
    chats: []
  },
  {
    ...defaultDocMeta,
    $id: 'mock-user-6',
    name: 'Aria Tanaka',
    username: 'atanaka',
    accountId: 'mock-account-6',
    email: 'aria.tanaka@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    bio: 'Ceramics & minimalist pottery studio in Tokyo 🏺',
    tags: ['ceramics', 'pottery', 'japan'],
    posts: [],
    liked: [],
    saves: [],
    followings: [],
    followers: [],
    chats: []
  }
]

export const mockCurrentUser = mockUsers[0]

export const mockPosts: Post[] = [
  {
    ...defaultDocMeta,
    $id: 'mock-post-1',
    caption: 'Golden hour along the Pacific Coast Highway. The light hit the cliffs just right. ✨🌅',
    tags: ['goldenhour', 'california', 'coastal', 'landscape'],
    location: 'Big Sur, California',
    creator: mockUsers[0],
    likes: [mockUsers[1], mockUsers[2]],
    saved: [],
    files: [
      createMockFile(
        'mock-file-1',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
        'big-sur-sunset.jpg'
      )
    ]
  },
  {
    ...defaultDocMeta,
    $id: 'mock-post-2',
    caption: 'Material studies in brutalist architecture. Concrete, shadows, and clean geometric lines.',
    tags: ['architecture', 'brutalism', 'design', 'concrete'],
    location: 'Berlin, Germany',
    creator: mockUsers[1],
    likes: [mockUsers[0], mockUsers[3], mockUsers[4]],
    saved: [],
    files: [
      createMockFile(
        'mock-file-2',
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
        'concrete-pavilion.jpg'
      )
    ]
  },
  {
    ...defaultDocMeta,
    $id: 'mock-post-3',
    caption: 'Morning pour-over ritual. Ethiopian Yirgacheffe notes: bergamot, peach, jasmine floral finish. ☕',
    tags: ['coffee', 'pourover', 'specialtycoffee', 'morning'],
    location: 'Portland, OR',
    creator: mockUsers[2],
    likes: [mockUsers[0], mockUsers[5]],
    saved: [],
    files: [
      createMockFile(
        'mock-file-3',
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80',
        'morning-coffee.jpg'
      )
    ]
  },
  {
    ...defaultDocMeta,
    $id: 'mock-post-4',
    caption: 'Early dawn alpine push above 7,000 feet. Crisp air, frosted ridges, and absolute stillness.',
    tags: ['hiking', 'mountains', 'alpine', 'adventure'],
    location: 'Mount Rainier, WA',
    creator: mockUsers[3],
    likes: [mockUsers[0], mockUsers[1], mockUsers[2]],
    saved: [],
    files: [
      createMockFile(
        'mock-file-4',
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80',
        'alpine-dawn.jpg'
      )
    ]
  },
  {
    ...defaultDocMeta,
    $id: 'mock-post-5',
    caption: 'Patching Eurorack modular cables tonight. Analog warmth through tape delay simulation.',
    tags: ['synth', 'eurorack', 'musicproduction', 'ambient'],
    location: 'Brooklyn, NY',
    creator: mockUsers[4],
    likes: [mockUsers[0], mockUsers[2]],
    saved: [],
    files: [
      createMockFile(
        'mock-file-5',
        'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=80',
        'modular-synth.jpg'
      )
    ]
  },
  {
    ...defaultDocMeta,
    $id: 'mock-post-6',
    caption: 'Wood-fired shino glaze tea bowls out of the kiln. Every imperfection tells a unique story.',
    tags: ['ceramics', 'pottery', 'wabisabi', 'craft'],
    location: 'Kyoto, Japan',
    creator: mockUsers[5],
    likes: [mockUsers[0], mockUsers[1], mockUsers[3]],
    saved: [],
    files: [
      createMockFile(
        'mock-file-6',
        'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80',
        'ceramic-tea-bowl.jpg'
      )
    ]
  },
  {
    ...defaultDocMeta,
    $id: 'mock-post-7',
    caption: 'Neon reflections on rain-soaked asphalt. Night photography in the bustling heart of Shibuya.',
    tags: ['streetphotography', 'tokyo', 'neon', 'cyberpunk'],
    location: 'Shibuya, Tokyo',
    creator: mockUsers[0],
    likes: [mockUsers[1], mockUsers[4], mockUsers[5]],
    saved: [],
    files: [
      createMockFile(
        'mock-file-7',
        'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80',
        'shibuya-rain.jpg'
      )
    ]
  },
  {
    ...defaultDocMeta,
    $id: 'mock-post-8',
    caption: 'Mid-century modernist retreat under desert constellations. Silence and starry horizons.',
    tags: ['architecture', 'desert', 'midcentury', 'stargazing'],
    location: 'Joshua Tree, CA',
    creator: mockUsers[1],
    likes: [mockUsers[0], mockUsers[2], mockUsers[3]],
    saved: [],
    files: [
      createMockFile(
        'mock-file-8',
        'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&auto=format&fit=crop&q=80',
        'desert-modern.jpg'
      )
    ]
  }
]

export const mockPostModels: PostModel[] = mockPosts.map(post => ({
  ...post,
  filesId: post.files.map(f => f.$id)
}))

export const mockSaves: Save[] = [
  {
    ...defaultDocMeta,
    $id: 'mock-save-1',
    user: mockUsers[0],
    post: mockPosts[1]
  },
  {
    ...defaultDocMeta,
    $id: 'mock-save-2',
    user: mockUsers[0],
    post: mockPosts[3]
  }
]

export const mockSaveModels: SaveModel[] = mockSaves.map(save => ({
  ...save,
  post: mockPostModels.find(p => p.$id === save.post.$id) ?? mockPostModels[0]
}))

const mockChatRoomId1 = 'mock-chatroom-1'

export const mockChatMember1: ChatMemberModel = {
  ...defaultDocMeta,
  $id: 'mock-chatmember-1',
  member: mockUsers[0],
  own_messages: [],
  received_messages: [],
  messages_to_read: 0,
  chat_room: {
    ...defaultDocMeta,
    $id: mockChatRoomId1,
    members: [],
    messages: []
  },
  online: true
}

export const mockChatMember2: ChatMemberModel = {
  ...defaultDocMeta,
  $id: 'mock-chatmember-2',
  member: mockUsers[1],
  own_messages: [],
  received_messages: [],
  messages_to_read: 1,
  chat_room: {
    ...defaultDocMeta,
    $id: mockChatRoomId1,
    members: [],
    messages: []
  },
  online: true
}

export const mockMessages: MessageModel[] = [
  {
    ...defaultDocMeta,
    $id: 'mock-msg-1',
    body: 'Hey Elena! Loved the photos of the concrete pavilion you shared.',
    is_edited: false,
    author_chat: mockChatMember1,
    receivers_chat: [mockChatMember2],
    related_chat: mockChatMember1.chat_room,
    author_chat_id: mockChatMember1.$id,
    receivers_chat_id: [mockChatMember2.$id]
  },
  {
    ...defaultDocMeta,
    $id: 'mock-msg-2',
    body: 'Thanks Alex! The lighting was incredible that morning. Did you see the new render series?',
    is_edited: false,
    author_chat: mockChatMember2,
    receivers_chat: [mockChatMember1],
    related_chat: mockChatMember1.chat_room,
    author_chat_id: mockChatMember2.$id,
    receivers_chat_id: [mockChatMember1.$id]
  }
]

export const mockChatRooms: ChatRoomModel[] = [
  {
    ...defaultDocMeta,
    $id: mockChatRoomId1,
    members: [mockChatMember1, mockChatMember2],
    messages: mockMessages
  }
]

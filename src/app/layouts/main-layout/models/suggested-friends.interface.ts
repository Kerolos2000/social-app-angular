export interface SuggestedFriend {
  _id: string;
  name: string;
  username?: string;
  photo: string;
  mutualFollowersCount: number;
  followersCount: number;
}

export interface SuggestedFriendsResponse {
  suggestions: SuggestedFriend[];
}

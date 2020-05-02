import { NonEnumerable } from '@d-fischer/shared-utils';
import TwitchClient from 'twitch';

export interface PubSubFollowingMessageData {
	display_name: string;
	username: string;
	user_id: number;
}

/**
 * A message informing about a user following.
 */
export default class PubSubFollowingMessage {
	@NonEnumerable private readonly _twitchClient: TwitchClient;

	/** @private */
	constructor(private readonly _data: PubSubFollowingMessageData, twitchClient: TwitchClient) {
		this._twitchClient = twitchClient;
	}

	/**
	 * The display name of the following user
	 */
	get displayName() {
		return this._data.display_name;
	}

	/**
	 * The username of the following user
	 */
	get username() {
		return this._data.username;
	}

	/**
	 * The user ID of the following user
	 */
	get userId() {
		return this._data.user_id.toString();
	}

	/**
	 * Retrieves more data about the user who followed.
	 */
	async getUser() {
		return this._twitchClient.helix.users.getUserById(this._data.user_id.toString());
	}
}

export interface UserNotifications {
	challengeOfTheDay: boolean,
	jackpotWinners: boolean,
	challengesJoined: boolean,
	friendsChallenges: boolean,
	userId: String
}

export const defaultUserNotifications: UserNotifications = {
	challengeOfTheDay: true,
	jackpotWinners: true,
	challengesJoined: true,
	friendsChallenges: true,
	userId: ''
}
class LeaderboardController {
	constructor($localForage, NgTableParams, sharedUser) {
		this.name = 'leaderboard';

		this.sharedUser = sharedUser;

		/**
		 * @name $localForage.getItem
		 * @description Get users list fron DB 
		 * and prepare parameters for table sorting
		 */
		let that = this;
		$localForage.getItem('users').then(function(users) {
			that.tableParams = new NgTableParams({
				count: 10, // count per page
				sorting: {score:'desc'} // default sort by column "Score"
			},
			{ dataset: users });
		}).catch(function(err) {
			console.log(err);
		});

		this.getLength = function(obj) {
			return Object.keys(obj).length;
		};
	}
}

export default LeaderboardController;
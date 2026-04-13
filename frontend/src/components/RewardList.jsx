import React from "react";

const RewardList = ({
  rewards,
  userPoints,
  onEditReward,
  onRedeemReward,
  onDeleteReward
}) => {
  if (!rewards.length) {
    return <p className="empty-text">Create a reward to make your progress more motivating.</p>;
  }

  return (
    <div className="reward-list">
      {rewards.map((reward) => {
        const canRedeem = userPoints >= reward.requiredPoints && !reward.redeemed;

        return (
          <div key={reward._id} className="reward-card">
            <div>
              <h3 className={reward.redeemed ? "completed-title" : ""}>
                {reward.title}
              </h3>
              <p>{reward.requiredPoints} points required</p>
            </div>

            <div className="task-actions">
              {!reward.redeemed ? (
                <>
                  <button
                    className="edit-btn"
                    onClick={() => onEditReward(reward)}
                  >
                    Edit
                  </button>

                  <button
                    className="complete-btn"
                    onClick={() => onRedeemReward(reward._id)}
                    disabled={!canRedeem}
                  >
                    {canRedeem ? "Redeem" : "Not Enough Points"}
                  </button>
                </>
              ) : (
                <span className="completed-badge">Redeemed</span>
              )}

              <button
                className="delete-btn"
                onClick={() => onDeleteReward(reward._id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RewardList;
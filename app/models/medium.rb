class Medium < ActiveRecord::Base
  attr_accessible :originally_broadcast_at, :soundcloud_id, :title, :hashtag
  
  has_many :responses, :inverse_of => :medium, :dependent => :destroy
  
  after_save :load_soundcloud_responses, :if => :soundcloud_id_changed?
  # after_save :load_twitter_responses, :if => :hashtag_changed?
  
  def load_soundcloud_responses
    responses.soundcloud.destroy_all
    SOUNDCLOUD_CLIENT.get('/comments', :track_id => soundcloud_id).each do |comment|
      responses.create!({
        source: "soundcloud",
        username: comment.user.username,
        body: comment.body,
        offset: comment.timestamp,
      })
    end
  end
  
  def load_twitter_responses
    
  end
end

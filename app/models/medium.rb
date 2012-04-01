class Medium < ActiveRecord::Base
  attr_accessible :originally_broadcast_at, :soundcloud_id, :title
  
  has_many :responses, :inverse_of => :medium, :dependent => :destroy
  
  after_create :load_initial_responses
  
  def load_initial_responses
    SOUNDCLOUD_CLIENT.get('/comments', :track_id => soundcloud_id).each do |comment|
      responses.create!({
        username: comment.user.username,
        body: comment.body,
        offset: comment.timestamp,
      })
    end
  end
end

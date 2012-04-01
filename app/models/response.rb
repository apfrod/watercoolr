class Response < ActiveRecord::Base
  belongs_to :medium, :inverse_of => :responses
  attr_accessible :body, :lat, :lng, :offset, :username, :source
  
  scope :soundcloud, where(source: "soundcloud")
  scope :twitter, where(source: "twitter")
  
  def as_json(opts = {})
    attributes.slice("username", "body", "offset", "id").tap do |atts|
      atts["timestamp"] = (medium.originally_broadcast_at + (offset/1000.0)).to_f.round(3)
    end
  end
end

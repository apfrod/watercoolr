class Response < ActiveRecord::Base
  belongs_to :medium, :inverse_of => :responses
  attr_accessible :body, :lat, :lng, :offset, :username
  
  def as_json(opts = {})
    attributes.slice("username", "body", "offset").tap do |atts|
      atts["timestamp"] = (medium.originally_broadcast_at + (offset/1000.0)).to_f.round(3)
    end
  end
end

class Response < ActiveRecord::Base
  belongs_to :medium, :inverse_of => :responses
  attr_accessible :body, :lat, :lng, :offset, :username
  
  def as_json(opts = {})
    attributes.slice("username", "body", "offset")
  end
end

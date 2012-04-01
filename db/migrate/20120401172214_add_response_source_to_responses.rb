class AddResponseSourceToResponses < ActiveRecord::Migration
  def change
    add_column :responses, :source, :string
  end
end

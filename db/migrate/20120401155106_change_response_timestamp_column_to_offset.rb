class ChangeResponseTimestampColumnToOffset < ActiveRecord::Migration
  def up
    remove_column :responses, :timestamp
    add_column :responses, :offset, :float
  end

  def down
    remove_column :responses, :offset
    add_column :responses, :timestamp, :datetime
  end
end
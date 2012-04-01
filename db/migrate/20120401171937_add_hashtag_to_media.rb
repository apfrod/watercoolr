class AddHashtagToMedia < ActiveRecord::Migration
  def change
    add_column :media, :hashtag, :string
  end
end

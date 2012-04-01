class CreateMedia < ActiveRecord::Migration
  def change
    create_table :media do |t|
      t.string :title
      t.string :soundcloud_id
      t.datetime :originally_broadcast_at

      t.timestamps
    end
  end
end

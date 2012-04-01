class CreateResponses < ActiveRecord::Migration
  def change
    create_table :responses do |t|
      t.references :medium
      t.string :username
      t.text :body
      t.datetime :timestamp
      t.float :lat
      t.float :lng

      t.timestamps
    end
    add_index :responses, :medium_id
  end
end

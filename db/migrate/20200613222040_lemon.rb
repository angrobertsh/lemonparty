class Lemon < ActiveRecord::Migration[5.2]
  def change
    create_table :lemons do |t|
      t.string :tree, null: false
      t.string :location, null: false
      t.string :note, null: false
      t.string :finder, null: false
      t.string :token
      t.float :lat, null: false
      t.float :lng, null: false

      t.timestamps
    end
  end
end

json.set! "#{lemon.id}" do
  json.extract! lemon, :id, :tree, :location, :note, :finder, :lat, :lng
end

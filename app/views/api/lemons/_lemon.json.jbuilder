json.set! "#{lemon.id}" do
  json.extract! truck, :id, :type, :location, :note, :finder, :lat, :lng
end

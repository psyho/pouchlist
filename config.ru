require 'rack-offline'

map "/application.manifest" do
  offline = Rack::Offline.configure root: '.build' do
    Dir['.build/**/*'].each do |f|
      next unless File.file?(f)
      cache f.gsub('.build/', '')
    end
  end

  run offline
end

use Rack::Static, urls: [""], root: '.build', index: 'index.html'

run proc{
  [404, {}, ["Not found."]]
}

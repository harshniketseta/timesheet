class HomeController < ApplicationController

  def index
    if current_user.present?
      redirect_to projects_path
    end
  end

end

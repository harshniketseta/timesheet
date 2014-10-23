class ListsController < ApplicationController

  def show
    type = params[:type]
    case type
      when "users"
        data = User.where(["username LIKE ?", "#{params[:q]}%"]).limit(params[:page_limit]).
            collect { |user| {:id => user.id, :text => user.username}}
      when "roles"
        data = Role.where(["name LIKE ?", "#{params[:q]}%"]).limit(params[:page_limit]).
            collect { |role| {:id => role.id, :text => role.name} }
    end
    render :json => {:success => true, :results => data}
  end
end

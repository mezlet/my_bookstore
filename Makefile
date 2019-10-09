
DOCKER_DEV_COMPOSE_FILE := docker-compose.yml
PROJECT_NAME ?=books-store



start:
	@ echo "creating required volumes"
	@ docker volume create --name=database_data
	@ docker volume create --name=redis_data
	@ echo "Building required docker images"
	@ docker-compose -f $(DOCKER_DEV_COMPOSE_FILE) build app
	@ echo "Build Completed successfully"
	@ echo "Starting local development server"
	@ docker-compose -f $(DOCKER_DEV_COMPOSE_FILE) up

## Remove all development containers and volumes
clean:
	 echo "Cleaning your local environment"
	@ docker-compose -f $(DOCKER_DEV_COMPOSE_FILE) down -v
	@ docker volume rm database_data
	@ docker volume rm redis_data
	@ docker images -q -f label=application=$(PROJECT_NAME) | xargs -I ARGS docker rmi -f ARGS
	@ docker images -q -f dangling=true -f label=application=$(PROJECT_NAME) | xargs -I ARGS docker rmi -f ARGS
	@ docker system prune

stop:
	echo "Stop development server containers"
	@ docker-compose -f $(DOCKER_DEV_COMPOSE_FILE) down -v
	echo "All containers stopped successfully"

## run migrations, the application needs to be running using make start
migrate:
	echo "Running books-stores migrations"
	@docker-compose -f $(DOCKER_DEV_COMPOSE_FILE) exec app npm run migrate
	echo "Migration executed successfully"

## run seeders, the application needs to be running using make start
seed:
	echo "Seeding books-store migrations"
	@docker-compose -f $(DOCKER_DEV_COMPOSE_FILE) exec app npm run seed
	echo "Database seed executed successfully"
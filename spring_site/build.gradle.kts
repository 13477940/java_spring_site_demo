plugins {
	java
	war
	id("org.springframework.boot") version "3.2.0-M2"
	id("io.spring.dependency-management") version "1.1.3"
}

group = "com.hgt"
version = "230914"
// release_war_name: HJT_SITE

java {
	sourceCompatibility = JavaVersion.VERSION_17
}

repositories {
	mavenCentral()
	maven { url = uri("https://repo.spring.io/milestone") }
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-web")
	providedRuntime("org.springframework.boot:spring-boot-starter-tomcat")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	implementation("org.reactivestreams:reactive-streams:1.0.4")
	implementation("org.springframework.boot:spring-boot-starter-webflux:3.1.3")
	implementation("com.google.code.gson:gson:2.10.1")
	implementation("org.apache.tika:tika-core:2.9.0")
	implementation("commons-io:commons-io:2.13.0")
	implementation("org.slf4j:slf4j-api:2.0.9")
	implementation(fileTree(mapOf("dir" to "libs", "include" to listOf("*.jar"))))
}

tasks.withType<Test> {
	useJUnitPlatform()
}

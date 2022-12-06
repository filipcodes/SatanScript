package app;

import java.util.ArrayList;
import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;

public class Book {
  int bookId;
  String title;
  int userId; // availability status if not 0 occupied, if 0 is free, and ID of the owner
  ArrayList<Integer> usersStory = new ArrayList<Integer>(); // will store WHO used the book
  String whenTaken = null;

  public Book(String title, Integer bookId) { // constructor
    this.title = title;
    this.bookId = bookId;
  }

  public void newUser(int userId) { // assign the book to a new user
    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
    LocalDateTime now = LocalDateTime.now();
    whenTaken = dtf.format(now);
    this.userId = userId;
  }

  public void returned(int userId) { // marks the book as returned to the library
    usersStory.add(userId); // adding the user ID to the book history
    this.userId = 0;
  }

  public void display() { // marks the book as returned to the library
    System.out.println("The book title is:" + this.title);
  }
}

#ifndef <%= className %>_H
#define <%= className %>_H

#include <Arduino.h>
#include "ESP8266WiFi.h"
#include <functional>

#ifdef ESP8266
extern "C" {
  #include "user_interface.h"
}
#endif

typedef void (*cmmc_debug_cb_t)(const char* message);

class <%= className %>
{
    public:
      // constructor
      <%= className %>() {
        auto blank = [](const char* message) {};
      }

      ~<%= className %>() {}

      void init();
      void debug(cmmc_debug_cb_t);
    private:
      cmmc_debug_cb_t _user_debug_cb;

};

#endif //<%= className %>_H

class HttpCodes {
    static CONTINUE = new HttpCodes(100);
    static SWITCHING_PROTOCOLS = new HttpCodes(101);
    static PROCESSING = new HttpCodes(102);
    static EARLY_HINTS = new HttpCodes(103);
    static RESPONSE_IS_STALE = new HttpCodes(110);
    static REVALIDATION_FAILED = new HttpCodes(111);
    static DISCONNECTED_OPERATION = new HttpCodes(112);
    static HEURISTIC_EXPIRATION = new HttpCodes(113);
    static MISCELLANEOUS_WARNING = new HttpCodes(199);
  
    static OK = new HttpCodes(200);
    static CREATED = new HttpCodes(201);
    static ACCEPTED = new HttpCodes(202);
    static NON_AUTHORATATIVE_INFORMATION = new HttpCodes(203);
    static NO_CONTENT = new HttpCodes(204);
    static RESET_CONTENT = new HttpCodes(205);
    static PARTIAL_CONTENT = new HttpCodes(206);
    static MULTI_STATUS = new HttpCodes(207);
    static ALREADY_REPORTED = new HttpCodes(208);
    static TRANSFORMATION_APPLIED = new HttpCodes(214);
    static IM_USED = new HttpCodes(226);
    static MISCELLANEOUS_PERSISTENT_WARNING = new HttpCodes(299);
  
    static MULTIPLE_CHOICES = new HttpCodes(300);
    static MOVED_PERMANENTLY = new HttpCodes(301);
    static FOUND = new HttpCodes(302);
    static MOVED_TEMPORARILY = new HttpCodes(302);
    static SEE_OTHER = new HttpCodes(303);
    static NOT_MODIFIED = new HttpCodes(304);
    static USE_PROXY = new HttpCodes(305);
    static SWITCH_PROXY = new HttpCodes(306);
    static TEMPORARILY_REDIRECT = new HttpCodes(307);
    static PERMANENT_REDIRECT = new HttpCodes(308);
  
    static BAD_REQUEST = new HttpCodes(400);
    static UNAUTHORIZED = new HttpCodes(401);
    static PAYMENT_REQUIRED = new HttpCodes(402);
    static FORBIDDEN = new HttpCodes(403);
    static NOT_FOUND = new HttpCodes(404);
    static METHOD_NOT_ALLOWED = new HttpCodes(405);
    static NOT_ACCEPTABLE = new HttpCodes(406);
    static PROXY_AUTHENTICATION_REQUIRED = new HttpCodes(407);
    static REQUEST_TIMEOUT = new HttpCodes(408);
    static CONFLICT = new HttpCodes(409);
    static GONE = new HttpCodes(410);
    static LENGTH_REQUIRED = new HttpCodes(411);
    static PRECONDITION_FAILED = new HttpCodes(412);
    static PAYLOAD_TOO_LARGE = new HttpCodes(413);
    static URI_TOO_LONG = new HttpCodes(414);
    static UNSUPPORTED_MEDIA_TYPE = new HttpCodes(415);
    static RANGE_NOT_SATISFIED = new HttpCodes(416);
    static EXPECTATION_FAILED = new HttpCodes(417);
    static IM_A_TEAPOT = new HttpCodes(418);
    static MISDIRECTED_REQUEST = new HttpCodes(421);
    static UNPROCESSABLE_ENTITY = new HttpCodes(422);
    static LOCKED = new HttpCodes(423);
    static FAILED_DEPENDENCY = new HttpCodes(424);
    static TOO_EARLY = new HttpCodes(425);
    static UPGRADE_REQUIRED = new HttpCodes(426);
    static TOO_MANY_REQUESTS = new HttpCodes(429);
    static REQUEST_HEADER_FIELDS_TOO_LARGE = new HttpCodes(431);
    static UNAVAILABLE_FOR_LEGAL_REASONS = new HttpCodes(451);
  
    static INTERNAL_SERVER_ERROR = new HttpCodes(500);
    static NOT_IMPLEMENTED = new HttpCodes(501);
    static BAD_GATEWAY = new HttpCodes(502);
    static SERVICE_UNAVAILABLE = new HttpCodes(503);
    static GATEWAY_TIMEOUT = new HttpCodes(504);
    static HTTP_VERSION_NOT_SUPPORTED = new HttpCodes(505);
    static VARIANT_ALSO_NEGOTIATES = new HttpCodes(506);
    static INSUFFICIENT_STORAGE = new HttpCodes(507);
    static LOOP_DETECTED = new HttpCodes(508);
    static NOT_EXTENDED = new HttpCodes(510);
    static NETWORK_AUTHENTICATION_REQUIRED = new HttpCodes(511);
  
    constructor(statusCode) {
      this.statusCode = statusCode;
    }
    toString() {
      return this.statusCode;
    }
  }
  
  module.exports = HttpCodes;
  